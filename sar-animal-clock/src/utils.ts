export function createElementFromHtml<T extends Element>(html: string): T {
  var div = document.createElement('div');
  div.innerHTML = html.trim();
  return div.firstChild as T;
}
