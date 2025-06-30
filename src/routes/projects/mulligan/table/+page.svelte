<script lang="ts">
	import Card from "./Card.svelte"


    const cards = [
        { id: 1, name: 'Tir Précis',  },
        { id: 2, name: 'Tir Puissant',  },
        { id: 3, name: 'Tir Rapide',  },
        { id: 4, name: 'Tir de Précision',  },
        { id: 3, name: 'Tir Rapide',  },
        { id: 4, name: 'Tir de Précision',  },
        { id: 3, name: 'Tir Rapide',  },
        { id: 4, name: 'Tir de Précision',  },
    ];

    const maxAngle = 15;
    const maxDistance = 50;
</script>

<div class="relative w-screen h-screen bg-stone-900">
<div id="hand" class="bottom-0 left-1/2 -translate-x-1/2 h-48 w-xl bg-white absolute overflow-hidden">

        {#each cards as card, i}
            {@const cardPos = (i + .5 - cards.length / 2)}
            {@const rotate = cardPos * (maxAngle / cards.length)}
            {@const translateX = cardPos * (((maxDistance + 50 * cards.length) / cards.length))}
            <button 
                class="absolute bg-gray-800  -bottom-3 left-1/2 -translate-x-1/2 rounded-lg text-white hover:bg-gray-700 transition-all duration-300 ease-in-out border
                hover:scale-105 hover:shadow-lg hover:shadow-gray-500/50 active:scale-100 active:shadow-none hover:z-50
                hover:-translate-y-10
                "
                style="transform: 
                        rotate({rotate}deg) 
                        translateX({translateX}px);
                        "
                >
                <Card {card} />
            
            </button>
        {/each}

</div>
</div>