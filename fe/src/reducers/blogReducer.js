export const initialState = {
  blogs: localStorage.getItem('blogs') ? JSON.parse(localStorage.getItem('blogs')) : []
}

export const blogReducer = (state, action) => {
  switch (action.type) {
    case 'BLOG_LIST':
      return {blogs: action.payload};
    case 'BLOG_ADD':
      return {blogs: [action.payload, ...state.blogs]};
    default:
      return state;
  }
}