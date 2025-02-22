import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import VTaskList from './v-task-list.vue'; 
import VTaskListItem from '../v-task-list-item/v-task-list-item.vue';
import { createPinia, setActivePinia } from 'pinia';

const mockTasks = [
    {
        id: '1',
        title: 'Task 1',
        isCompleted: false,
    },
    {
        id: '2',
        title: 'Task 2',
        isCompleted: true,
    },
];

const mockT = (key: string) => key;

describe('VTaskList.vue', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('рендерит список задач', () => {
        const wrapper = mount(VTaskList, {
            props: {
                tasks: mockTasks,
            },
            global: {
                components: {
                    VTaskListItem,
                },
                mocks: {
                    $t: mockT
                }
            },
        });

        const taskItems = wrapper.findAllComponents(VTaskListItem);
        expect(taskItems.length).toBe(mockTasks.length);

        taskItems.forEach((taskItem, index) => {
            expect(taskItem.props('task')).toEqual(mockTasks[index]);
        });
    });

    it('не рендерит задачи, если список пуст', () => {
        const wrapper = mount(VTaskList, {
            props: {
                tasks: [],
            },
            global: {
                components: {
                    VTaskListItem,
                },
                mocks: {
                    $t: mockT
                }
            },
        });

        const taskItems = wrapper.findAllComponents(VTaskListItem);
        expect(taskItems.length).toBe(0);
    });

    it('корректно передаёт пропсы в VTaskListItem', () => {
        const wrapper = mount(VTaskList, {
            props: {
                tasks: mockTasks,
            },
            global: {
                components: {
                    VTaskListItem,
                },
                mocks: {
                    $t: mockT
                }
            },
        });

        const taskItems = wrapper.findAllComponents(VTaskListItem);
        taskItems.forEach((taskItem, index) => {
            expect(taskItem.props('task')).toEqual(mockTasks[index]);
        });
    });
});