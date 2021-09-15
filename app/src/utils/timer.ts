export async function awaitSetTimeOut(time: number): Promise<void> {
  await new Promise((r) => setTimeout(r, time));
}
