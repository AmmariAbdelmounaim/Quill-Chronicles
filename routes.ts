export const routes = {
  home: { path: "/", title: "Home Page", authRequired: false },
  articles: {
    path: "/articles",
    title: "User articles page",
    authRequired: true,
  },
  newArticle: {
    path: "/new-article",
    title: "Write article",
    authRequired: true,
  },
  editArticle: {
    path: "/edit-article",
    title: "Edit article",
    authRequired: true,
  },
};
