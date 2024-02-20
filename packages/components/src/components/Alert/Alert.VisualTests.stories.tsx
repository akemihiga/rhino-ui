import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Alert, AlertProps } from './Alert';
import { ALERT_VARIANTS } from './Alert.constants';
import { Box } from '../Box/Box';
import { Heading } from '../Heading/Heading';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert/Visual Regression Tests',
  component: Alert,
};

export default meta;

const Template: StoryFn<AlertProps> = args => (
  <Box>
    {ALERT_VARIANTS.map(variant => (
      <Alert
        {...args}
        className="m-bottom-md"
        variant={variant}
        key={variant}
      />
    ))}
    <Box className="m-top-xl m-bottom-md">
      <Heading size="md">isCompact</Heading>
    </Box>
    {ALERT_VARIANTS.map(variant => (
      <Alert
        {...args}
        className="m-bottom-md"
        variant={variant}
        isCompact
        key={`compact-${variant}`}
      />
    ))}
  </Box>
);

export const AllProps = Template.bind({});
AllProps.args = {
  title: 'Title Text',
  message: 'Message text',
  hasIcon: true,
  isClosable: true,
};

export const TitleOnly = Template.bind({});
TitleOnly.args = {
  title: 'Title Text Only',
};

export const MessageOnly = Template.bind({});
MessageOnly.args = {
  message: 'Message text only',
};
