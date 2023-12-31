<template>
  <div @click="handleTaskClick" id="task-item">
    <span class="task-code-container">
      <span class="task-code">{{ belongsToGroup.course }}</span>
      <span class="separator">|</span>
      <span class="task-name">{{ taskName }}</span>
    </span>

    <span class="task-description">{{ taskDescription }}</span>
    <span id="task-details">
      <b-avatar class="avatar" variant="light" text="taskAssignee">{{ initials(taskAssignee) }}</b-avatar>
      <TaskLabel :label="taskLabel" />
      <span class="task-date">{{ convertDateToReadableFormat(taskDate) }}</span>
    </span>
  </div>
</template>

<script>
import TaskLabel from './TaskLabel'
import { EventBus } from '../event-bus'

export default {
  name: 'Task',
  components: {
    TaskLabel
  },
  props: {
    taskName: {
      type: String,
      default: ''
    },
    taskDescription: {
      type: String,
      default: ''
    },
    taskAssignee: {
      type: String,
      default: ''
    },
    belongsToGroup: {
      type: Object,
      default: () => ({})
    },
    taskLabel: {
      type: String,
      default: ''
    },
    taskStatus: {
      type: String,
      default: ''
    },
    taskDate: {
      type: String,
      default: ''
    },
    taskId: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleTaskClick() {
      EventBus.$emit('task-clicked', {
        // Should convert this to a task type but its impossible in this shity language
        taskName: this.taskName,
        taskDescription: this.taskDescription,
        taskStatus: this.taskStatus,
        taskLabel: this.taskLabel,
        taskAssignee: this.taskAssignee,
        taskDate: this.taskDate,
        taskId: this.taskId,
        belongsToGroup: this.belongsToGroup
      })
    },
    convertDateToReadableFormat(date) {
      const dateObj = new Date(date)
      const month = dateObj.toLocaleString('default', { month: 'short' })
      const day = dateObj.getDate()
      return `${day} ${month}`
    },
    initials(member) {
      if (!member) return ''
      const name = member
      // should prolly create a avatar component for this shit instead of doing magic on the name in every component
      return name
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase())
        .join('')
    }
  }
}

</script>

<style scoped>
#task-item {
  background-color: #0d1319;
  color: white;
  padding: 10px 15px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.2s, box-shadow 0.2s;
  cursor: pointer;
  border: 1px solid transparent;
}

#task-item:hover {
  background-color: #070808;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.avatar {
  margin-right: 10px;
  height: 30px;
}

.task-code-container {
  flex: 1;
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.task-name {
  font-size: 0.8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.separator {
  margin: 0 5px;
}

.task-code {
  font-weight: bold;
}

.task-description {
  flex: 2;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

#task-details {
  flex: 1;
  justify-content: flex-end;
  display: flex;
  align-items: center;
}

.task-label,
.task-date {
  margin: 0 7px;
  font-weight: bold;
}

@media screen and (max-width: 768px) {
  #task-item {
    flex-direction: column;
    align-items: flex-start;
    padding: 15px;
  }

  .separator {
    display: none;
  }

  .task-code-container,
  .task-description,
  #task-details {
    width: 100%;
    margin-bottom: 10px;
    white-space: normal;
  }

  .task-name,
  .task-description {
    font-size: 1rem;
  }

  .task-code-container {
    justify-content: space-between;
  }

  .task-description {
    text-align: left;
  }

  #task-details {
    justify-content: space-between;
  }
}
</style>
