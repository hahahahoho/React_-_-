//미들웨어는 store를 생성할 때 적용할 수 있다.
const listMiddleware = store => next => action => {
    
    console.log('현재상태', store.getState());

    console.log('액션', action);
    const result = next(action);

    console.log('다음 상태', store.getState());
    console.log('\n')

    return result
}
export default listMiddleware