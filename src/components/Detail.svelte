<script lang="ts">
  const { title, value }: { title: string; value: string } = $props();
</script>

<div class="detail-container">
  <p class="title">{title}:</p>
  <p class="value">{value}</p>
</div>

<style>
  .detail-container {
    display: flex;
    width: 75%;
    justify-content: space-between;
    align-items: center;
  }

  .title {
    text-align: start;
  }

  .value {
    text-align: end;
  }
</style>
