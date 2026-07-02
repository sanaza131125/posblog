let token;
const blogId = "MASUKKAN_BLOG_ID"; // ganti dengan blog ID kamu

function initClient() {
  gapi.load("client:auth2", () => {
    gapi.client.init({
      apiKey: "AIzaSyD8YuWjrxXGHWDl769vIDn-qPTzstyTBOU",
      clientId: "706901790381-hmev49l5fnnok909e38lm5821ktt0gbr.apps.googleusercontent.com",
      discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/blogger/v3/rest"],
      scope: "https://www.googleapis.com/auth/blogger"
    }).then(() => {
      document.getElementById("loginBtn").onclick = () => {
        gapi.auth2.getAuthInstance().signIn().then(() => {
          token = gapi.auth.getToken().access_token;
          alert("✅ Login berhasil!");
        });
      };
    });
  });
}

async function postToBlogger() {
  const body = {
    kind: "blogger#post",
    title: document.getElementById("title").value,
    content: `
      <p>${document.getElementById("content").value}</p>
      <img src="${document.getElementById("imageUrl").value}" />
      <p>${document.getElementById("hashtags").value}</p>
    `,
    labels: document.getElementById("labels").value.split(","),
    published: new Date(document.getElementById("scheduleTime").value).toISOString()
  };

  const response = await fetch(
    `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts/`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }
  );
