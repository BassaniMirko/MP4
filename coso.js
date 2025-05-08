// coso.js
let data = [];
let ftypBrands = [];

fetch('output.json')
  .then(r => r.text())
  .then(txt => {
    const regex = /"compatible_brand"\s*:\s*"([^"]+)"/g;
    let m;
    while ((m = regex.exec(txt)) !== null) {
      ftypBrands.push(m[1]);
    }
    data = JSON.parse(txt);
    setupClicks();
  })
  .catch(() => console.error('Impossibile caricare output.json'));

const defaultFrame = `
╔═════════════════════════════════════════════════════════════════════════════════════╗
║                                   STRUTTURA FILE MP4                                ║
╠════════════╦════════════╦════════════╦════════════╣
║    ftyp    ║    moov    ║    mdat    ║    udta    ║
╚════════════╩════════════╩════════════╩════════════╝
`;
const topLine = defaultFrame.trim().split('\n')[0];
const interiorW = topLine.length - 2;
const wrapWidth = interiorW - 2;

function wrapLinesToWidth(text) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const w of words) {
    const cand = line ? line + ' ' + w : w;
    if (cand.length > wrapWidth) {
      lines.push(line);
      line = w;
    } else {
      line = cand;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function centerText(str) {
  const pad = Math.floor((interiorW - str.length) / 2);
  return ' '.repeat(pad) + str + ' '.repeat(interiorW - str.length - pad);
}

function padLine(str) {
  return '║ ' + str + ' '.repeat(wrapWidth - str.length) + ' ║';
}

function boxContent(lines) {
  document.getElementById('boxContent').textContent = lines.join('\n');
}

function setupClicks() {
  document.querySelectorAll('.clickable').forEach(el => {
    el.addEventListener('click', () => {
      const box = el.dataset.box;
      if (box === 'ftyp')      showFtyp();
      else if (box === 'moov') showMoov();
      else if (box === 'mdat') showMdat();
      else if (box === 'udta') showUdta();
    });
  });
}

function findTopBox(name)   { return data.find(b => b.name === name); }
function findChildBox(p,n)  { return p?.children?.find(c => c.name === n); }
function formatBytes(b) {
  const u = ['B','KB','MB','GB'];
  if (!b) return '0 B';
  const i = Math.floor(Math.log(b)/Math.log(1024));
  return (b/Math.pow(1024,i)).toFixed(2) + ' ' + u[i];
}

function formatRow(label, desc, value) {
  const col1 = label.padEnd(20);
  const col2 = desc.padEnd(45);
  const col3 = String(value).padEnd(15);
  return `║ ${col1}║ ${col2}║ ${col3}║`;
}

function showFtyp() {
  const f = findTopBox('ftyp');
  if (!f) return;
  const info = [
    { label: 'Header size', desc: 'Dimensione dell’intestazione', value: `${f.header_size} B` },
    { label: 'Box size', desc: 'Dimensione totale del box', value: formatBytes(f.size) },
    { label: 'Major Brand', desc: 'Tipo principale del file', value: f.major_brand },
    { label: 'Minor Version', desc: 'Versione del formato', value: f.minor_version }
  ];
  const lines = [
    topLine,
    '║' + centerText('FTYP BOX') + '║',
    '╠' + '═'.repeat(interiorW) + '╣',
    formatRow('Voce', 'Significato', 'Contenuto'),
    '╠' + '═'.repeat(21) + '╬' + '═'.repeat(46) + '╬' + '═'.repeat(16) + '╣',
    ...info.map(i => formatRow(i.label, i.desc, i.value)),
    '╠' + '═'.repeat(interiorW) + '╣',
    padLine('Compatible brands supportate:'),
    ...ftypBrands.map(b => padLine(`• ${b}`)),
    '╚' + '═'.repeat(interiorW) + '╝'
  ];
  boxContent(lines);
}

function showMoov() {
  const m = findTopBox('moov');
  if (!m) return;
  const mvhd = findChildBox(m, 'mvhd');
  const tracks = m.children?.filter(c => c.name === 'trak') || [];
  const lines = [
    topLine,
    '║' + centerText('MOOV BOX') + '║',
    '╠' + '═'.repeat(interiorW) + '╣',
    formatRow('Voce', 'Significato', 'Contenuto'),
    '╠' + '═'.repeat(20) + '╬' + '═'.repeat(45) + '╬' + '═'.repeat(15) + '╣',
    formatRow('Header size', 'Dimensione intestazione', `${m.header_size} B`),
    formatRow('Box size', 'Dimensione del box', formatBytes(m.size)),
    formatRow('Timescale', 'Unità di tempo (ticks/sec)', mvhd.timescale),
    formatRow('Duration', 'Durata del video in secondi', (mvhd.duration / mvhd.timescale).toFixed(2) + ' s'),
    formatRow('Tracks found', 'Numero di tracce video/audio', tracks.length),
  ];
  tracks.forEach((t, i) => {
    const tk = findChildBox(t, 'tkhd');
    const md = findChildBox(findChildBox(t, 'mdia'), 'mdhd');
    const hd = findChildBox(findChildBox(t, 'mdia'), 'hdlr');
    const type = hd.handler_type === 'vide' ? 'Video' : 'Audio';
    lines.push('╠' + '─'.repeat(interiorW) + '╣');
    lines.push(formatRow(`Track ${i+1}`, 'Tipo traccia', type));
    lines.push(formatRow('Track ID', 'Identificativo traccia', tk.id));
    lines.push(formatRow('Duration', 'Durata in secondi', (tk.duration / md.timescale).toFixed(2) + ' s'));
    if (type === 'Video') {
      lines.push(formatRow('Resolution', 'Dimensioni del frame', `${tk.width}×${tk.height}`));
    } else {
      lines.push(formatRow('Timescale', 'Frequenza di campionamento', `${md.timescale} Hz`));
    }
  });
  lines.push('╚' + '═'.repeat(interiorW) + '╝');
  boxContent(lines);
}

function showMdat() {
  const d = findTopBox('mdat');
  if (!d) return;
  const lines = [
    topLine,
    '║' + centerText('MDAT BOX') + '║',
    '╠' + '═'.repeat(interiorW) + '╣',
    formatRow('Voce', 'Significato', 'Contenuto'),
    '╠' + '═'.repeat(20) + '╬' + '═'.repeat(45) + '╬' + '═'.repeat(15) + '╣',
    formatRow('Header size', 'Dimensione intestazione', `${d.header_size} B`),
    formatRow('Box size', 'Dimensione dati multimediali', formatBytes(d.size)),
    '╚' + '═'.repeat(interiorW) + '╝'
  ];
  boxContent(lines);
}

function showUdta() {
  const moov = findTopBox('moov');
  const u = findChildBox(moov, 'udta');
  if (!u) return;
  const ilst = findChildBox(findChildBox(u, 'meta'), 'ilst');
  const header = `Header size   : ${u.header_size} B`;
  const total = `Box size      : ${formatBytes(u.size)}`;
  const tags = ilst?.children?.map(tag => {
    const d = findChildBox(tag, 'data');
    return `${tag.name.replace(/^\./, '').toUpperCase()}: ${d?.value || ''}`;
  }) || ['Nessun metadato disponibile.'];
  const wrapped = tags.flatMap(wrapLinesToWidth);
  const lines = [
    topLine,
    '║' + centerText('UDTA BOX') + '║',
    '╠' + '═'.repeat(interiorW) + '╣',
    formatRow('Voce', 'Significato', 'Contenuto'),
    '╠' + '═'.repeat(20) + '╬' + '═'.repeat(45) + '╬' + '═'.repeat(15) + '╣',
    formatRow('Header size', 'Dimensione intestazione', `${u.header_size} B`),
    formatRow('Box size', 'Dimensione del box', formatBytes(u.size)),
    '╠' + '═'.repeat(interiorW) + '╣',
    ...wrapped.map(l => padLine(l)),
    '╚' + '═'.repeat(interiorW) + '╝'
  ];
  boxContent(lines);
}
