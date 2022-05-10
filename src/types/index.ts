export interface RowProps {
  bookingId: number;
  onView: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

export interface BookingsTableProps {
  bookingIds: { bookingid: number }[];
  loading: boolean;
  fetchAllBookings: () => void;
}

export interface BookingData {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: {
    checkin: string;
    checkout: string;
  };
  additionalneeds: string;
}

export interface ModalComponentProps {
  bookingId?: number;
  isModalOpened: boolean;
  onModalClose: () => void;
  viewOnlyMode?: boolean;
}

export interface HookformProps extends Partial<BookingData> {
  bookingHandler: (data: BookingData) => void;
  editMode?: boolean;
}
