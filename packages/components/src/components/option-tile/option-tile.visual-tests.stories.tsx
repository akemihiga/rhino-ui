import React from 'react';
import { Meta, StoryFn, ComponentStory } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { OptionTile, OptionTileProps } from './option-tile';
import { Box } from '../box/box';

const meta: Meta<typeof OptionTile> = {
  title: 'Components/OptionTile/Visual Regression Tests',
  component: OptionTile,
};

export default meta;

export const States: ComponentStory<typeof OptionTile> = () => (
  <Box gap="lg">
    <OptionTile
      isSelected={false}
      id="defaultRadio"
      name="defaultRadio"
      value="default"
      label="default"
      onChange={() => {}} // eslint-disable-line
    >
      radio default
    </OptionTile>
    <OptionTile
      isSelected
      id="selectedRadio"
      name="selectedRadio"
      value="selected"
      label="selected"
      onChange={() => {}} // eslint-disable-line
    >
      radio selected
    </OptionTile>
    <OptionTile
      inputType="checkbox"
      isSelected={false}
      id="defaultCheckbox"
      name="defaultCheckbox"
      value="default"
      label="default"
      onChange={() => {}} // eslint-disable-line
    >
      checkbox default
    </OptionTile>
    <OptionTile
      inputType="checkbox"
      isSelected
      id="selectedCheckbox"
      name="selectedCheckbox"
      value="selected"
      label="selected"
      onChange={() => {}} // eslint-disable-line
    >
      checkbox selected
    </OptionTile>
    <OptionTile
      isSelected={false}
      id="hiddenRadio"
      name="hiddenRadio"
      value="hidden"
      label="hidden"
      hideInput
      onChange={() => {}} // eslint-disable-line
    >
      hidden input default
    </OptionTile>
    <OptionTile
      isSelected
      id="selectedHiddenRadio"
      name="selectedHiddenRadio"
      value="selectedHidden"
      label="selectedHidden"
      hideInput
      onChange={() => {}} // eslint-disable-line
    >
      hidden input selected
    </OptionTile>
  </Box>
);

const Template: StoryFn<OptionTileProps> = args => (
  <OptionTile
    {...args}
    onChange={() => {}} // eslint-disable-line
  >
    {args.children} {/* eslint-disable-line */}
  </OptionTile>
);

export const FocusUnchecked = Template.bind({});
FocusUnchecked.args = {
  isSelected: false,
  children: 'radio unchecked',
  id: 'radioUnchecked',
  name: 'radioUnchecked',
  value: 'radioUnchecked',
  label: 'radioUnchecked',
};

FocusUnchecked.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  canvas.getByRole('radio').focus();
};

export const FocusChecked = Template.bind({});
FocusChecked.args = {
  isSelected: true,
  children: 'radio selected',
  id: 'radioSelected',
  name: 'radioSelected',
  value: 'radioSelected',
  label: 'radioSelected',
};

FocusChecked.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  canvas.getByRole('radio').focus();
};
