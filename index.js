const textContainers = document.querySelectorAll('.content');
const sources = [
  'https://raw.githubusercontent.com/chrislgarry/Apollo-11/refs/heads/master/Luminary099/ASCENT_GUIDANCE.agc',
  'https://raw.githubusercontent.com/ROCm/MIOpen/refs/heads/develop/src/kernels/Conv_Winograd_v16_5_0_stride1.inc',
  'https://raw.githubusercontent.com/pret/pokecrystal/refs/heads/master/engine/battle/core.asm',
];
async function load() {
  const sourcesData = await Promise.all(sources.map(
    async (source) => await fetch(source)
      .then((response) => response.text())
      .then((data) => ({
        data: data.split('\n'),
        cursor: 0,
      })
    )
  ));

  document.addEventListener('keypress', (e) => {
    const index = Math.random() * textContainers.length | 0;
    const textContainer = textContainers[index];
    const source = sourcesData[index];

    if (source.cursor < source.data.length) {
      textContainer.innerText += source.data[source.cursor] + '\n';
      source.cursor++;
      textContainer.scrollTo(0, textContainer.scrollHeight);
    } else {
      source.cursor = 0;
    }
  });
}

load();