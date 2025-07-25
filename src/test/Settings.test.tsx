import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi, beforeEach, afterAll, beforeAll } from 'vitest';

import { NavButtons } from '../components/Header/NavButtons';

describe('Settings', () => {
    const mockProps = {
        onEndGame: vi.fn(),
        countdownTime: 60,
        numberOfBadGuesses: 30,
        numberOfPairs: 12,
        onSaveSettings: vi.fn(),
    }

    let user: ReturnType<typeof userEvent.setup>;

    beforeAll(() => {
        const modalRoot = document.createElement('div');
        modalRoot.setAttribute('id', 'modal-root');
        document.body.appendChild(modalRoot);
    });

    afterAll(() => {
        const modalRoot = document.getElementById('modal-root');
        if (modalRoot) modalRoot.remove();
    });

    beforeEach(() => {
        cleanup();
        user = userEvent.setup();
        render(<NavButtons {...mockProps} />);
    });


    test('Settings button should be visible', () => {
        const settingsBtn = screen.getByLabelText(/open settings/i);

        expect(settingsBtn).toBeInTheDocument();
    });

    test('Clicking on settings button should show settings modal', async () => {
        const settingsBtn = screen.getByLabelText(/open settings/i);
        await user.click(settingsBtn);

        const settingsModal = screen.getByText(/game settings/i);

        const pairsInput = screen.getByRole('spinbutton', { name: /pair/i });
        const countdownInput = screen.getByRole('spinbutton', { name: /countdown/i });
        const guessesInput = screen.getByRole('spinbutton', { name: /guess/i });

        expect(settingsModal).toBeInTheDocument();

        expect(pairsInput).toBeInTheDocument();
        expect(countdownInput).toBeInTheDocument();
        expect(guessesInput).toBeInTheDocument();
    });

    test('Settings form inputs should have the right default value', async () => {
        const settingsBtn = screen.getByLabelText(/open settings/i);
        await user.click(settingsBtn);

        const pairsInput = screen.getByRole('spinbutton', { name: /pair/i });
        const countdownInput = screen.getByRole('spinbutton', { name: /countdown/i });
        const guessesInput = screen.getByRole('spinbutton', { name: /guess/i });

        expect(pairsInput).toHaveValue(mockProps.numberOfPairs);
        expect(countdownInput).toHaveValue(mockProps.countdownTime);
        expect(guessesInput).toHaveValue(mockProps.numberOfBadGuesses);
    });

    test('Settings form inputs should be validated on submit', async () => {
        const settingsBtn = screen.getByLabelText(/open settings/i);
        await user.click(settingsBtn);

        const pairsInput = screen.getByRole('spinbutton', { name: /pair/i });
        const countdownInput = screen.getByRole('spinbutton', { name: /countdown/i });
        const guessesInput = screen.getByRole('spinbutton', { name: /guess/i });
        const submitBtn = screen.getByRole('button', { name: /save/i });

        await user.clear(pairsInput);
        await user.type(pairsInput, '0');

        await user.clear(countdownInput);
        await user.type(countdownInput, '0');

        await user.clear(guessesInput);
        await user.type(guessesInput, '0');

        await user.click(submitBtn);

        expect(pairsInput).toHaveClass('invalid');
        expect(countdownInput).toHaveClass('invalid');
        expect(guessesInput).toHaveClass('invalid');
    });

    test('Submit should close settings form', async () => {
        const settingsBtn = screen.getByLabelText(/open settings/i);
        await user.click(settingsBtn);

        const submitBtn = screen.getByRole('button', { name: /save/i });
        await user.click(submitBtn);

        const settingsModal = screen.queryByText(/game settings/i);

        expect(settingsModal).not.toBeInTheDocument();
    })
})