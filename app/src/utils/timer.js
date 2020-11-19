export async function awaitSetTimeOut(time) {
  await new Promise((r) => setTimeout(r, time));
}
