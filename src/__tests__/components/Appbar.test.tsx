import { render, screen, fireEvent } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { describe, it, expect, vi } from 'vitest';

import { useNavigate } from 'react-router-dom';
import Appbar from '../../components/Appbar';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

describe('Appbar', () => {
  it('renders correctly and navigates on button click', () => {
    const navigate = vi.fn();
    (useNavigate as any).mockReturnValue(navigate);

    render(
      <RecoilRoot>
        <Appbar />
      </RecoilRoot>
    );

    expect(screen.getByText('Mflix')).toBeInTheDocument();

    const navItems = [
      { name: 'Home', link: '/' },
      { name: 'Movies', link: '/movies' },
      { name: 'TvSeries', link: '/tv-series' },
      { name: 'Search', link: '/search' },
    ];

    navItems.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });

    const movieButton = screen.getByText('Movies');
    fireEvent.click(movieButton);
    expect(navigate).toHaveBeenCalledWith('/movies');
  });

  it('applies correct styles based on currentPage state', () => {
    render(
      <RecoilRoot>
        <Appbar />
      </RecoilRoot>
    );

    const homeButton = screen.getByText('Home');
    expect(homeButton).toHaveClass('bg-gray-700 text-blue-200 font-bold');

    const moviesButton = screen.getByText('Movies');
    fireEvent.click(moviesButton);

    expect(moviesButton).toHaveClass('bg-gray-700 text-blue-200 font-bold');

    expect(homeButton).not.toHaveClass('bg-gray-700 text-blue-200 font-bold');
  });
});
