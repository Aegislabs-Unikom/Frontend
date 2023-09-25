export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('auth');
        if (serializedState === null) {
            return undefined;
        }
        console.log("ini load "+serializedState);
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
}; 

export const saveState = (state:any) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('auth', serializedState);
    } catch (error){
      console.log(error);
    }
};