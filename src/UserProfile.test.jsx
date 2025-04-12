import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserProfile from './UserProfile';

beforeEach(() => {
    global.fetch = jest.fn();
});

afterEach(() => {
    jest.resetAllMocks();
});

describe('UserProfile Component', () => {
    it('displays loading', () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ name: 'Name Test', email: 'test@gmail.com' }),
        });

        render(<UserProfile userId="123" />);
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it('displays user data when fetch is success', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                users: [
                    {
                        firstName: 'Test',
                        lastName: 'Name',
                        email: 'test@gmail.com',
                    },
                ],
            }),
        });

        render(<UserProfile userId="123" />);

        const nameEl = await screen.findByText('Test Name');
        const emailEl = await screen.findByText('Email: test@gmail.com');

        expect(nameEl).toBeInTheDocument();
        expect(emailEl).toBeInTheDocument();
    });

    it('displays error message on fetch fail', async () => {
        fetch.mockResolvedValueOnce({
            ok: false,
        });

        render(<UserProfile userId="123" />);

        await waitFor(() => {
            expect(screen.getByText(/error: failed to fetch user data/i)).toBeInTheDocument();
        });
    });

    it('displays error message on network error', async () => {
        fetch.mockRejectedValueOnce(new Error('Network Error'));

        render(<UserProfile userId="123" />);

        await waitFor(() => {
            expect(screen.getByText(/error: network error/i)).toBeInTheDocument();
        });
    });
});
