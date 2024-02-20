import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { CheckboxInput, CheckboxInputProps } from './CheckboxInput';

const meta: Meta<typeof CheckboxInput> ={
  title: 'Components/CheckboxInput/Playground',
  component: CheckboxInput,
  argTypes: {
    id: {
      control: 'text',
    },
    isChecked: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
    },
    helpText: {
      control: 'text',
    },
    hideLabel: {
      control: 'boolean',
    },
    isDisabled: {
      control: 'boolean',
    },
    isRequired: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
    className: {
      control: 'text',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    isIndeterminate: {
      control: 'boolean',
    },
  },
};

export default meta;

const Template: StoryFn<CheckboxInputProps> = ({ ...args }) => <CheckboxInput {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  id: 'playGroundCheckbox',
  label: 'Playground Checkbox',
  helpText: 'Helpful text',
  isChecked: true,
};
