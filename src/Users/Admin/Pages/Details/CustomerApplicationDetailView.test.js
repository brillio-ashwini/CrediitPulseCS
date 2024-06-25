// // CustomerApplicationDetailView.test.js
// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import { MemoryRouter, Route, Routes } from 'react-router-dom';

// import CustomerApplicationDetailView from './CustomerApplicationDetailView';
// import DetailView from '../../Components/DetailView/DetailView';

// // Mock DetailView component
// jest.mock('../../Components/DetailView/DetailView', () => {
//   return jest.fn(() => <div>DetailView Component</div>);
// });

// describe('CustomerApplicationDetailView Component', () => {
//   const customerData = {
//     name: 'John Doe',
//     panId: 'ABCDE1234F',
//     mobileNumber: '1234567890',
//     companyName: 'Tech Corp',
//     annualIncome: '10,00,000',
//     cardType: 'Gold',
//     incomeProofFilePath: 'path/to/employment/proof',
//   };

//   const renderComponent = (state) => {
//     render(
//       <MemoryRouter initialEntries={[{ pathname: '/customer-detail', state }]}>
//         <Routes>
//           <Route path="/customer-detail" element={<CustomerApplicationDetailView />} />
//         </Routes>
//       </MemoryRouter>
//     );
//   };

//   test('renders DetailView component with correct props', () => {
//     renderComponent({ customer: customerData });

//     // Ensure the mocked DetailView component is rendered
//     expect(screen.getByText('DetailView Component')).toBeInTheDocument();

//     // Ensure DetailView component is called with correct props
//     expect(DetailView).toHaveBeenCalledWith(
//       expect.objectContaining({
//         activeItem: 'All Pending Customer Applications',
//         details: customerData,
//         detailFields: [
//           { label: 'Name', key: 'name' },
//           { label: 'PAN ID', key: 'panId' },
//           { label: 'Mobile Number', key: 'mobileNumber' },
//           { label: 'Current Employment Company', key: 'companyName' },
//           { label: 'Annual Income', key: 'annualIncome' },
//           { label: 'Card Type', key: 'cardType' },
//         ],
//         downloadFiles: [
//           { label: 'Download Employment Proof', key: 'incomeProofFilePath' },
//         ],
//       }),
//       {}
//     );
//   });

//   test('renders "No details available" when customer data is not provided', () => {
//     // Adjust DetailView mock to handle no details scenario
//     DetailView.mockImplementation(() => <div>No details available.</div>);
    
//     renderComponent({});

//     // Ensure "No details available" is rendered
//     expect(screen.getByText('No details available.')).toBeInTheDocument();
//   });
// });

// CustomerApplicationDetailView.test.js
import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import CustomerApplicationDetailView from './CustomerApplicationDetailView';
import DetailView from '../../Components/DetailView/DetailView';

jest.mock('../../Components/DetailView/DetailView', () => jest.fn(() => <div>DetailView Component</div>));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn()
}));

describe('CustomerApplicationDetailView Component', () => {
  const mockCustomer = {
    name: 'John Doe',
    panId: 'ABCDE1234F',
    mobileNumber: '1234567890',
    companyName: 'ABC Corp',
    annualIncome: '1000000',
    cardType: 'Gold',
    incomeProofFilePath: 'income-proof.pdf'
  };

  beforeEach(() => {
    useLocation.mockReturnValue({
      state: { customer: mockCustomer }
    });
  });

  test('renders correctly with customer details', () => {
    render(
      <MemoryRouter>
        <CustomerApplicationDetailView />
      </MemoryRouter>
    );

    expect(DetailView).toHaveBeenCalledWith(
      expect.objectContaining({
        activeItem: 'All Pending Customer Applications',
        details: mockCustomer,
        detailFields: expect.arrayContaining([
          { label: 'Name', key: 'name' },
          { label: 'PAN ID', key: 'panId' },
          { label: 'Mobile Number', key: 'mobileNumber' },
          { label: 'Current Employment Company', key: 'companyName' },
          { label: 'Annual Income', key: 'annualIncome' },
          { label: 'Card Type', key: 'cardType' }
        ]),
        downloadFiles: expect.arrayContaining([
          { label: 'Download Employment Proof', key: 'incomeProofFilePath' }
        ])
      }),
      {}
    );
  });

  test('renders correctly without customer details', () => {
    useLocation.mockReturnValue({
      state: null
    });

    render(
      <MemoryRouter>
        <CustomerApplicationDetailView />
      </MemoryRouter>
    );

    expect(DetailView).toHaveBeenCalledWith(
      expect.objectContaining({
        activeItem: 'All Pending Customer Applications',
        details: undefined,
        detailFields: expect.any(Array),
        downloadFiles: expect.any(Array)
      }),
      {}
    );
  });
});
