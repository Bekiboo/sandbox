<script lang="ts">
const input = `
- Présence +1
    - Vol +1
        - Vol +1D
            - Vol relance
    - Influenceur
        - Prestance
- Intelligence +1
- Chance +1
    - Oeil de faucon
- Force +1
    - Armure I
        - Armure II
            - Armure III
    - Attaque en puissance
    - Prouesse
        - Imposant
        - Force +1
- Aglité +1
    - Ref +1
        - Ref +1D
            - Ref relance
        - Agilité +1
    - Vitesse I
        - Vitesse II
            - Vitesse III
            - Dash II
        - Dash I
            - Dash ++
            - Dash ++
    - Tir Précis
        - Tir Puissant
        - Visée
- Endurance +1
    - Vig +1
        - Vig +1D
            - Vig relance
        - Endurance +1
    - +3pv
        - +1pv/lvl
`;

// Fonction de transformation
function parseIndentedText(text: string): Array<{ id: number, name: string, parent: number[] | null, children: number[] }> {
  const lines = text.trim().split('\n').map(line => {
    const match = line.match(/^(\s*)- (.+)$/);
    if (!match) return null;
    const indent = match[1].length;
    const name = match[2].trim();
    return { indent, name };
  }).filter(Boolean);

  const nodes = [];
  const stack = [];
  let id = 1;

  for (const line of lines) {
    const node = {
      id: id++,
      name: line.name,
      parent: null,
      children: []
    };

    while (stack.length > 0 && line.indent <= stack[stack.length - 1].indent) {
      stack.pop();
    }

    if (stack.length > 0) {
      node.parent = [stack[stack.length - 1].node.id];
      stack[stack.length - 1].node.children.push(node.id);
    } else {
      node.parent = null;
    }

    nodes.push(node);
    stack.push({ indent: line.indent, node });
  }

  return nodes;
}

// Utilisation
const nodesLinkedList = parseIndentedText(input);
console.log(nodesLinkedList);

</script>
