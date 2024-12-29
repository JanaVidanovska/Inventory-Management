import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';  
import App from './App';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mockAxios = new MockAdapter(axios);

describe('Inventory Management App', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  test('fetches and displays inventory items', async () => {
    mockAxios.onGet('/api/inventory').reply(200, {
      inventory_items: [
        { id: '1', type: 'Communication Equipment', description: 'Test item', added_at: '01/01/2024 12:30:34', updated_at: '05/04/2024 11:23:32', state: 'In User' },
      ],
    });

    render(<App />);

    await waitFor(() => screen.getByDisplayValue('Test item'));

    const description = screen.getByDisplayValue('Test item');
    expect(description).toBeInTheDocument();

    const id = screen.getByText('1');
    expect(id).toBeInTheDocument();

    const addedAt = screen.getByText('01/01/2024 12:30:34');
    const updatedAt = screen.getByText('01/01/2024 12:30:34');
    expect(addedAt).toBeInTheDocument();
    expect(updatedAt).toBeInTheDocument();

    const typeSelect = screen.getByDisplayValue('Communication Equipment'); 
    expect(typeSelect).toBeInTheDocument();

    const stateSelect = screen.getByDisplayValue('In User');
    expect(stateSelect).toBeInTheDocument();
  });

  test('adds a new item', async () => {
    mockAxios.onPost('/api/inventory').reply(200, {
      id: '2',
      type: 'Computer Equipment',
      description: 'New item',
      state: 'Broken',
      added_at: '01/01/2024 12:33:34',
      updated_at: '01/01/2024 12:38:12',
    });

    render(<App />);
    const addButton = screen.getByText(/\+ add new item/i);
    fireEvent.click(addButton);

    await waitFor(() => screen.getByDisplayValue('New item'));

    const description = screen.getByDisplayValue('New item');
    expect(description).toBeInTheDocument();

    const typeSelect = screen.getByDisplayValue('Computer Equipment'); 
    expect(typeSelect).toBeInTheDocument();
    
    const addedAt = screen.getByText('01/01/2024 12:33:34');
    const updatedAt = screen.getByText('01/01/2024 12:38:12');
    expect(addedAt).toBeInTheDocument();
    expect(updatedAt).toBeInTheDocument();

    expect(addedAt).toBeInTheDocument();

    const stateSelect = screen.getByDisplayValue('Broken');
    expect(stateSelect).toBeInTheDocument();

    const id = screen.getByText('2');
    expect(id).toBeInTheDocument();
  });

  test('deletes an item', async () => {
    mockAxios.onGet('/api/inventory').reply(200, {
      inventory_items: [
        { id: '1', type: 'Communication Equipment', description: 'Test item', added_at: '01/01/2024 12:30:34', updated_at: '05/04/2024 11:23:32', state: 'In User' },
      ],
    });

    render(<App />);

    await waitFor(() => screen.getByDisplayValue('Test item'));
    
    mockAxios.onDelete('/api/inventory/1').reply(200);

    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    await waitFor(() => expect(screen.queryByText('Test item')).not.toBeInTheDocument());
  });
});
