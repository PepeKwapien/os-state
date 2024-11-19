<script lang="ts">
  const { title = "" } = $props();
</script>

<div class="breaker-container">
  <div class="breaker"></div>
  {#if title}
    <h2>{title}</h2>
  {:else}
    <div></div>
  {/if}
  <div class="breaker"></div>
</div>

<style>
  h2 {
    padding: 0 1rem;
  }
  .breaker-container {
    display: grid;
    grid-template-columns: 3fr auto 3fr;
    align-items: center;
    margin: 0.75rem 0;
    width: 100%;
  }
  .breaker {
    border-bottom: 2px solid #f5f5f577;
    width: 100%;
  }
</style>
