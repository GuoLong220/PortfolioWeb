export async function initTerminal(portfolioData) {
  const terminalContent = document.querySelector('.typing-text');
  
  // 從 data.js 獲取資料
  const aboutData = portfolioData.about;

  // 動態生成終端機內容
  const text = `
> const developer = {
>   name: "${aboutData.Name}",
>   title: "${aboutData.Title}",
>   specialties: [
>     ${aboutData.Specialties}
>   ],
>   passions: [
>     ${aboutData.Passions}
>   ]
> };
> 
> console.log("Welcome to my portfolio!");
`;

  let index = 0;
  const typingSpeed = 20; // 控制打字速度（單位：毫秒）

  function typeText() {
    if (index < text.length) {
      terminalContent.textContent += text.charAt(index);
      index++;
      setTimeout(typeText, typingSpeed);
    }
  }

  // 清空內容並開始打字動畫
  terminalContent.textContent = '';
  typeText();
}