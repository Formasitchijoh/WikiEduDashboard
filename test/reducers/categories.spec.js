import deepFreeze from 'deep-freeze';
import categories from '../../app/assets/javascripts/reducers/categories';
import { RECEIVE_CATEGORIES, ADD_CATEGORY, DELETE_CATEGORY } from '../../app/assets/javascripts/constants';
import '../testHelper';

const categoriesArray = [
    {
    id: 2,
    name: 'Second Category',
    source: 101,
    wiki_id: 1001,
    sender_id: 5001,
    },
    {
    id: 3,
    name: 'Third Category',
    source: 101,
    wiki_id: 1001,
    sender_id: 5001,
      },
    {
    id: 4,
    name: 'Fourth Category',
    source: 101,
    wiki_id: 1001,
    sender_id: 5001,
      },
    {
    id: 5,
    name: 'Fifth Category',
    source: 101,
    wiki_id: 1001,
    sender_id: 5001,
      }
  ];

describe('ticket reducer', () => {
    test('returns initial state when no action or state is provided', () => {
        const newState = categories(undefined, { type: null });
        expect(newState.categories).toEqual([]);
        expect(newState.loading).toBe(true);
    });

    test('updates the state with provided categories when RECEIVE_CATEGORIES is dispatched', () => {
       const initialState = { categories: [{ id: 1, name: 'First Category', wiki_id: 1001, sender_id: 5001, }], loading: true };
            deepFreeze(initialState);

            const mockedAction = {
                type: RECEIVE_CATEGORIES,
                data: { course: { categories: categoriesArray } }
            };

            const newState = categories(initialState, mockedAction);
            expect(newState.categories).toContainEqual(categoriesArray[1]);
            expect(newState.loading).toBe(false);
    });

    test('adds a new category when ADD_CATEGORY is dispatched', () => {
        const initialState = { categories: [categoriesArray[0]], loading: true };
        deepFreeze(initialState);

        const mockedAction = {
            type: ADD_CATEGORY,
            data: { course: { categories: [...initialState.categories, { ...categoriesArray[3] }] } }
        };

        const newState = categories(initialState, mockedAction);
        expect(newState.categories.length).toBe(2);
        expect(newState.categories).toContainEqual({ ...categoriesArray[3] });
        expect(newState.loading).toBe(false);
     });

     test('removes a category when DELETE_CATEGORY is dispatched', () => {
        const initialState = { categories: [{ ...categoriesArray[0] }], loading: true };
        deepFreeze(initialState);

        const mockedAction = {
            type: DELETE_CATEGORY,
            data: { course: { categories: [] } }
        };

        const newState = categories(initialState, mockedAction);
        expect(newState.categories.length).toBe(0);
        expect(newState.loading).toBe(false);
     });
});
