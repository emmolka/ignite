export interface RowProps {
  bookingId: number;
  onEdit: () => void;
}

export interface BookingsTableProps {
  bookingIds: { bookingid: number }[];
  loading: boolean;
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
