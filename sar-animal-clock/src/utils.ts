export function padLeft(text: string, padText: string, length: number): string {
  return (padText.repeat(length) + text).slice(-length);
}

export function createElementFromHtml<T extends Element>(html: string): T {
  var div = document.createElement('div');
  div.innerHTML = html.trim();
  return div.firstChild as T;
}
