import { useMutation } from '@tanstack/vue-query';
import { api } from '../services/api';
import { Commitment } from '../stores/commitmentsStore';

interface CreateCommitmetntProps {
  title: string;
  dateConclusion: Date;
  userId: string;
}

async function createCommitment(commitment: CreateCommitmetntProps): Promise<Commitment> {
  const response = await api.post('/createCommitments', commitment);
  return response.data;
}

export function useAddCommitment() {
  return useMutation({
    mutationFn: createCommitment,
  });
}