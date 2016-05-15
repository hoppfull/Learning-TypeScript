/* ex02 - external reference
 */
/// <reference path="external.ts" />

document.body.textContent = x.toString();

/* The compiled result has to be referenced in
 * proper order in the html-file. No automatic
 * merging process or anything like that. This
 * is good in a way because it prevents cyclic
 * dependencies. But be careful because the
 * Typescript intellisense wont warn against
 * it!
*/