const SUPABASE_URL = "https://dlmaujcsjgapzszwxwhf.supabase.co";//SupabaseのURL
const ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsbWF1amNzamdhcHpzend4d2hmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIyOTY2NTYsImV4cCI6MjEwNzg3MjY1Nn0.tLqArXR0xAdUTDq4ErpUHmADXtJwcBwg5-RV4bo3R8A";
//APIキー
const supabaseClient = window.supabase.createClient(SUPABASE_URL, ANON_KEY);

// 1. ユーザー登録（ユーザー名・メール・パスワード）
async function signUp(username, email, password) {
  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
    options: {
      data: {
        username: username, // Supabaseの user_metadata にユーザー名を保存
      },
    },
  });
//エラー処理
  if (error) {
    console.error('登録エラー:', error.message);
    alert('登録に失敗しました: ' + error.message);
  } else {
    console.log('登録成功:', data);
    alert('登録が完了しました！');
    window.location.href = 'login.html'; // ログイン画面へ遷移
  }
}

// 2. ユーザーログイン処理
async function signIn(email, password) {
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('ログインエラー:', error.message);
    // 存在しないアカウント / パスワード違い どちらも一律で同じメッセージを表示
    alert('ログインできません。メールアドレスまたはパスワードをご確認ください。');
  } else {
    console.log('ログイン成功:', data.user);
    alert('ログインに成功しました！');
    window.location.href = 'index.html'; // 任意の後続ページへ遷移
  }
}

// 3. ログアウト
async function signOut() {
  const { error } = await supabaseClient.auth.signOut();
  if (error) {
    console.error('ログアウトエラー:', error.message);
  } else {
    console.log('ログアウト成功');
    window.location.href = 'login.html';
  }
}
