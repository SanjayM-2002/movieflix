import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreditsSlider from '../../components/CreditsSlider';
import { describe, test, expect } from 'vitest';

describe('CreditsSlider', () => {
  const mockData = [
    {
      profile_path: 'test1.jpg',
      name: 'Cast Member 1',
      known_for_department: 'Acting',
    },
    {
      profile_path: 'test2.jpg',
      name: 'Cast Member 2',
      known_for_department: 'Directing',
    },
    {
      profile_path: 'test3.jpg',
      name: 'Cast Member 3',
      known_for_department: 'Writing',
    },
    {
      profile_path: 'test4.jpg',
      name: 'Cast Member 4',
      known_for_department: 'Editing',
    },
    {
      profile_path: 'test5.jpg',
      name: 'Cast Member 5',
      known_for_department: 'Acting',
    },
  ];

  test('renders correctly with the provided data', () => {
    render(<CreditsSlider data={mockData} />);

    expect(screen.getByAltText('Cast Member 1')).toBeInTheDocument();
    expect(screen.getByAltText('Cast Member 2')).toBeInTheDocument();
    expect(screen.getByAltText('Cast Member 3')).toBeInTheDocument();
    expect(screen.getByAltText('Cast Member 4')).toBeInTheDocument();
  });

  test('disables the previous button when at the start', () => {
    render(<CreditsSlider data={mockData} />);

    expect(screen.getByText('<')).toBeDisabled();
  });

  test('disables the next button when at the end', () => {
    render(<CreditsSlider data={mockData} />);

    fireEvent.click(screen.getByText('>'));

    waitFor(() => {
      expect(screen.getByText('>')).toBeDisabled();
    });
  });
});
