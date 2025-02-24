import { config, mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import VTaskListItem from '../v-task-list-item/v-task-list-item.vue'
import VTaskList from './v-task-list.vue'

config.global.components = {
  VTaskListItem,
}

const mockT = (key: string) => key

config.global.mocks = {
  $t: mockT,
}

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
]

describe('vTaskList.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('render list of tasks', () => {
    const wrapper = mount(VTaskList, {
      props: {
        tasks: mockTasks,
      },
    })

    const taskItems = wrapper.findAllComponents(VTaskListItem)
    expect(taskItems.length).toBe(mockTasks.length)

    taskItems.forEach((taskItem, index) => {
      expect(taskItem.props('task')).toEqual(mockTasks[index])
    })
  })

  it('doesnt render list of tasks', () => {
    const wrapper = mount(VTaskList, {
      props: {
        tasks: [],
      },
    })

    const taskItems = wrapper.findAllComponents(VTaskListItem)
    expect(taskItems.length).toBe(0)
  })

  it('correct props passed to VTaskListItem', () => {
    const wrapper = mount(VTaskList, {
      props: {
        tasks: mockTasks,
      },
    })

    const taskItems = wrapper.findAllComponents(VTaskListItem)
    taskItems.forEach((taskItem, index) => {
      expect(taskItem.props('task')).toEqual(mockTasks[index])
    })
  })
})
