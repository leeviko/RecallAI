'use client';
import { useState } from 'react';
import EditDeck from './EditDeck';
import { DeckWithIds } from '@/lib/schemas/flashcards';
import { useRouter } from 'next/navigation';
import { updateDeck, UpdateDeckParams } from '@/app/(decks)/actions';
import { toast } from 'sonner';

type Props = {
  deck: DeckWithIds;
};

const EditExistingDeck = ({ deck }: Props) => {
  const router = useRouter();
  const [updatedDeck, setUpdatedDeck] = useState<DeckWithIds>(deck);
  const [loading, setLoading] = useState(false);

  const handleBack = () => {
    router.push('/dashboard');
  };

  const handleSubmit = async () => {
    setLoading(true);

    const updates: UpdateDeckParams = {
      name: updatedDeck.name,
      cards: updatedDeck.cards,
    };

    try {
      const result = await updateDeck(deck.id, updates);

      if (result.ok) {
        toast.success('Deck updated successfully.');
        return router.push(`/deck/${deck.id}`);
      }

      toast.error(result.msg || 'Failed to update deck.');
    } catch (err) {
      console.error('Error updating deck:', err);
      toast.error('Failed to update deck.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <EditDeck
      deck={updatedDeck}
      setDeck={setUpdatedDeck}
      handleBack={handleBack}
      handleSubmit={handleSubmit}
      isNewDeck={false}
      loading={loading}
    />
  );
};

export default EditExistingDeck;
