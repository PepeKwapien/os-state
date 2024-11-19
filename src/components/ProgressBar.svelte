<script lang="ts">
  import { isNumeric } from "../helpers/number.helper";

  const {
    max,
    value,
    unit,
  }: { max: Number | string; value: Number | string; unit: string } = $props();

  let maxNumber = 0;
  let valueNumber = 0;
  if (isNumeric(max)) {
    maxNumber = +max;
  }
  if (isNumeric(value)) {
    valueNumber = +value;
  }

  const percentageUsed = (valueNumber / maxNumber) * 100;
</script>

<div class="progress-bar-container">
  <div class="progress-bar">
    <p class="border">&lt;</p>
    <div class="color-container">
      <div
        class="color green"
        class:yellow={percentageUsed > 50}
        class:red={percentageUsed > 75}
        style="width: {percentageUsed}%;"
      ></div>
    </div>

    <p class="border">&gt;</p>
  </div>
  <p>{value} / {max} {unit}</p>
</div>

<style>
  .progress-bar-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .progress-bar * {
    margin: 0;
  }

  .progress-bar {
    font-size: 2rem;

    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .border {
    font-size: 2rem;
  }

  .color-container {
    flex: 1;
  }

  .color {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    height: 0.2rem;
  }

  .green {
    background-color: green;
  }

  .yellow {
    background-color: yellow;
  }

  .red {
    background-color: red;
  }
</style>
