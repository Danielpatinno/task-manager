import { useMutation } from '@tanstack/vue-query';
import { api } from '../services/api';
import { Commitment } from '../stores/commitmentsStore';

interface CreateCommitmetntProps {
  title: string;
  dateConclusion: Date;
}

async function createCommitment(commitment: CreateCommitmetntProps): Promise<Commitment> {
  const response = await api.post('/createCommitment', commitment);
  return response.data;
}

export function useAddCommitment() {
  return useMutation({
    mutationFn: createCommitment,
  });
}