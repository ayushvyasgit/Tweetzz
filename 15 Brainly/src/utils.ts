export function random(len : number){
  let options = "sdfjksdjfkadsjfoidfj a12!2@3";
  let lenght = options.length;
  let ans = "";
  for(let i=0 ;i<len ;i++){
    ans+=options[( Math.random()*length)];
  }
  return ans;
}