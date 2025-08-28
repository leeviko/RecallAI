import { DeckWithoutIds } from '@/lib/schemas/flashcards';
import { addDeck } from '@/app/(decks)/actions';
import { useState } from 'react';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';
import EditDeck from '../decks/EditDeck';

type Props = {
  deck: DeckWithoutIds;
  setDeck: React.Dispatch<React.SetStateAction<DeckWithoutIds | null | string>>;
  setGenerated: React.Dispatch<React.SetStateAction<boolean>>;
};

const Overview = ({ deck, setDeck, setGenerated }: Props) => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    const res = await addDeck(deck);
    setLoading(false);

    if (res.ok) {
      toast.success('Deck saved successfully!');
      redirect(`/deck/${res.data.id}`);
    } else {
      toast.error('Failed to save deck.');
    }
  };

  const handleBack = () => {
    setDeck(null);
    setGenerated(false);
  };

  return (
    <EditDeck
      isNewDeck={true}
      deck={deck}
      setDeck={setDeck}
      handleBack={handleBack}
      handleSubmit={handleSubmit}
      loading={loading}
    />
  );
};

export default Overview;
