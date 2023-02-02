

const counter = {
    count1: 0,
    count2: 100,
};

export default function ReducerPractice(state = counter, action) {
    switch (action.type) {
        case 'ADD': {
            return (
                [...state, { count1: state.count1++, count2: state.count2--}]
            );
        }
        default: {
            return state;
        }
    }
}