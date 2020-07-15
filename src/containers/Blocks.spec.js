import React from 'react';
import thunk from 'redux-thunk';
import configureMockStore from "redux-mock-store";
import { create } from "react-test-renderer";
import Blocks from './Blocks';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import Block from '../components/Block';

describe('Blocks', () => {
    const blocks = {
        list: [
            {
                url: 'sample',
                loading: false,
                succes: false,
                data: [{
                    attributes:{
                        index: 1
                    }
                }]
            }
        ]
    }

    it("check block element exist", () => {
        const middlewares = [thunk];
        const store = configureMockStore(middlewares)({blocks});
        const component = mount(
            <Provider store={store}>
                <Blocks nodeUrl="sample"  />
            </Provider>
        );
        expect(component.find(Block).length).toEqual(1)
        
    });

    it("should match snapshot", () => {
        const middlewares = [thunk];
        const store = configureMockStore(middlewares)({blocks});
        const component = create(
            <Provider store={store}>
                <Blocks nodeUrl="sample"/>
            </Provider>
        );
        const tree = component.toJSON();

        expect(tree).toMatchSnapshot();
    });
})