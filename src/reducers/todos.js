
export default function (state = [], action) {
  switch (action.type) {
    case 'get':
      return action.body;
    default:
      return state;
  }
}
