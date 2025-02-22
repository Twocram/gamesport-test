import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, config } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { useTaskStore } from '../../../../stores/task';
import TaskItem from '../../../lists/task/v-task-list-item/v-task-list-item.vue'; 
import vButton from '../../../ui/v-button.vue';
import VCheckbox from '../../../ui/v-checkbox.vue';
import VInput from '../../../ui/v-input.vue';
import { createI18n } from 'vue-i18n';
import en from "../../../../locales/en.json";
import ru from "../../../../locales/ru.json";
import { nextTick } from 'vue';

config.global.components = {
    vButton,
    VCheckbox,
    VInput
}

const mockTask = {
    id: '1',
    title: 'Test Task',
    isCompleted: false,
};

const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en,
        ru
    }
})

const mockT = (key: string) => key;

describe('TaskItem.vue', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it('renders todo item correctly', () => {
        const wrapper = mount(TaskItem, {
            props: {
                task: mockTask,
            },
            global: {
                mocks: {
                    $t: mockT
                }
            },
        });

        expect(wrapper.text()).toContain('Test Task');
        expect(wrapper.findComponent(VCheckbox).exists()).toBe(true);
        expect(wrapper.findAllComponents(vButton).length).toBe(2);
    });

    it('switch edit mode on button click', async () => {
        const taskStore = useTaskStore();

        taskStore.updateTask = vi.fn()
        
        const wrapper = mount(TaskItem, {
            props: {
                task: mockTask,
            },
            global: {
                plugins: [i18n]
            },
        });

        
        const button = wrapper.findAllComponents(vButton)[0];

        expect(button.text()).toContain('Edit')
        expect(wrapper.findComponent(VInput).exists()).toBe(false);

        await button.trigger('click');
        await nextTick()

        expect(wrapper.findComponent(VInput).exists()).toBe(true);
        expect(button.text()).toContain('Save');

        await button.trigger('click');
        await nextTick();

        expect(button.text()).toContain('Edit');
        expect(wrapper.findComponent(VInput).exists()).toBe(false);
    });

    it('calls removeTask on remove button click', async () => {
        const wrapper = mount(TaskItem, {
            props: {
                task: mockTask,
            },
            global: {
                mocks: {
                    $t: mockT
                }
            },
        });

        const taskStore = useTaskStore();
        taskStore.removeTask = vi.fn();

        await wrapper.findAllComponents(vButton)[1].trigger('click');

        expect(taskStore.removeTask).toHaveBeenCalledWith('1');
    });

    it('update isCompleted on checkbox change', async () => {
        const wrapper = mount(TaskItem, {
            props: {
                task: mockTask,
            },
            global: {
                mocks: {
                    $t: mockT
                }
            },
        });

        const taskStore = useTaskStore();
        taskStore.updateTask = vi.fn();

        await wrapper.findComponent(VCheckbox).setValue(true);

        expect(taskStore.updateTask).toHaveBeenCalledWith({
            ...mockTask,
            isCompleted: true,
        });
    });
});