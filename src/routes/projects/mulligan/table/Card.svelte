<script lang="ts">
    let {card} = $props();
</script>

<div class="min-h-32 w-20">
    {#if card}
        <div class="w-full h-full flex items-center justify-center">
            {card.name}        </div>
    {/if}
</div>