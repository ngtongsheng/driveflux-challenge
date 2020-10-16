import React from 'react';
import { render } from '@testing-library/react';

import InputNumber from './input-number';

describe('InputNumber', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InputNumber />);
    expect(baseElement).toBeTruthy();
  });
});
