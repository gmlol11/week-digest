// === Проверка токена доступа ===
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');

// Список допустимых токенов (можно вынести в отдельный JSON или API позже)
const allowedTokens = ["demo123", "abc456"];

if (!allowedTokens.includes(token)) {
  document.body.innerHTML = "<h2 style='text-align:center;margin-top:3rem;'>Доступ запрещён</h2>";
} else {
  // Очищаем URL от токена после входа
  history.replaceState(null, "", window.location.pathname);
}
