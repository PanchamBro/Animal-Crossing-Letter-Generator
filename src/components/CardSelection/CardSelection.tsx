import "./CardSelection.css";
import { DEFAULT_STATIONARY, HOLIDAYS } from "../Card/cardConstants";
import Card from "../Card/Card";
import { useNavigate } from "react-router";

export default function CardSelection() {
  const navigate = useNavigate();
  const cards = DEFAULT_STATIONARY.map((type) => (
    <Card type={type}
      key={type}
      tilt={true}
      onClick={() => navigate(`/editor?card=${encodeURIComponent(type)}`)} />
  ));
  // Prepend seasonal cards
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();
  // Determine which seasonal cards to show
  for (const holidayKey in HOLIDAYS) {
    const holiday = HOLIDAYS[holidayKey as keyof typeof HOLIDAYS];
    const startMonth = holiday.start.month;
    const startDay = holiday.start.day;
    const endMonth = holiday.end.month;
    const endDay = holiday.end.day;
    // Note that the end month may be less than the start month if the holiday spans the new year
    const afterStart = month > startMonth || (month === startMonth && day >= startDay);
    const beforeEnd = month < endMonth || (month === endMonth && day <= endDay);
    const spansNewYear = endMonth < startMonth || (endMonth === startMonth && endDay < startDay);
    const inRange = spansNewYear
      ? (afterStart || beforeEnd)
      : (afterStart && beforeEnd);
    if (inRange) {
      for (let i = holiday.cards.length - 1; i >= 0; i--) {
        const type = holiday.cards[i];
        cards.unshift(
          <Card type={type}
            key={type}
            tilt={true}
            limitedDate={`${endMonth}/${endDay}`}
            onClick={() => navigate(`/editor?card=${encodeURIComponent(type)}`)} />
        );
      }
    }
  }
  return (
    <div className="mailbox-holder">
      <div className="mailbox">
        {cards}
      </div>
    </div>
  );
} 