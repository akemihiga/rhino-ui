import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { TimePicker, TimePickerProps } from './time-picker';

const meta: Meta<typeof TimePicker> = {
  title: 'Components/TimePicker/Playground',
  component: TimePicker,
  argTypes: {
    startTime: {
      control: 'object',
    },
    endTime: {
      control: 'object',
    },
    locales: {
      control: 'text',
    },
    interval: {
      control: 'number',
    },
    autoComplete: {
      control: 'boolean',
    },
    id: {
      control: 'text',
    },
    label: {
      control: 'text',
    },
    name: {
      control: 'text',
    },
    value: {
      control: 'text',
    },
    autoFocus: {
      control: 'boolean',
    },
    dateDisplayOptions: {
      control: 'object',
    },
    error: {
      control: 'text',
    },
    helpText: {
      control: 'text',
    },
    hideLabel: {
      control: 'boolean',
    },
    isClearable: {
      control: 'boolean',
    },
    isDisabled: {
      control: 'boolean',
    },
    isRequired: {
      control: 'boolean',
    },
    className: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
    prefix: {
      control: 'text',
    },
    suffix: {
      control: 'text',
    },
    size: {
      control: {
        type: 'radio',
        options: ['sm', 'md', 'lg'],
      },
    },
    menuPortalTarget: {
      control: 'none',
    },
  },
};

export default meta;

const Template: StoryFn<TimePickerProps> = ({ ...args }) => <TimePicker {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  id: 'playgroundTimePicker',
  label: 'Playground TimePicker',
  name: 'playgroundTimePicker',
  menuPortalTarget: document.body,
};
