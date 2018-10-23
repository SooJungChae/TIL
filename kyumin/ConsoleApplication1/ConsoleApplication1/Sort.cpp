#include "pch.h"
#include "Sort.h"


Sort::Sort()
{
}


Sort::~Sort()
{
}
void Sort::Swap(int& origin, int& dest)
{
	int temp = origin;
	origin = dest;
	dest = temp;
}

void Sort::Quick(int* pArr, int arrCount)
{
	QuickSort(pArr, 0, arrCount - 1);
}

void Sort::QuickSort(int* pArr, int left, int right)
{
	if (left < right)
	{
		int newPivot = Divided(pArr, left, right);

		QuickSort(pArr, left, newPivot - 1);
		QuickSort(pArr, newPivot + 1, right);
	}
}

int Sort::Divided(int* pArr, int left, int right)
{
	int pivotValue = pArr[left];
	int low = left +1;
	int high = right;
	do
	{
		while (low <= right && pArr[low] < pivotValue)
		{
			low++;
		}
		while (high >= left && pArr[high] > pivotValue)
		{
			high--;
		}

		if (low < high)
			Swap(pArr[low], pArr[high]);
	} while (low < high);

	Swap(pArr[left], pArr[high]);
	return high;
}

void Sort::Insert(int * pArr, int arrCount)
{
	for (int i = 0; i + 1 < arrCount; ++i)
	{
		int next = i +1;
		if (pArr[i] > pArr[next])
		{
			int j = next;
			int minIdex = -1;
			while (j-- > 0)
			{
				if (pArr[next] < pArr[j])
				{
					minIdex = j;
				}
			}
			if (minIdex > -1)
				PushArr(pArr, next, minIdex);
			else
				Swap(pArr[i], pArr[i + 1]);
		}

	}
}
void Sort::PushArr(int * pArr, int start, int end)
{
	int temp = pArr[start];
	for (int i = start; i > end; --i)
	{
		pArr[i] = pArr[i - 1];
	}
	pArr[end] = temp;
}

void Sort::Merge(int* pArr, int left, int mid, int right)
{
	int temp[50];
	int curIndex = left;
	int leftIndex = left;
	int rightIndex = mid + 1;
	while (leftIndex <= mid && rightIndex <= right)
	{
		if (pArr[leftIndex] < pArr[rightIndex])
		{
			temp[curIndex] = pArr[leftIndex++];
		}
		else
		{
			temp[curIndex] = pArr[rightIndex++];
		}
		curIndex++;
	}
	if (leftIndex > mid)
	{
		for (int i = rightIndex; i <= right; ++i, curIndex++)
		{
			temp[curIndex] = pArr[i];
		}
	}
	else
	{
		for (int i = leftIndex; i <= mid; ++i, curIndex++)
		{
			temp[curIndex] = pArr[i];
		}
	}
	for (int i = left; i <= right; ++i)
	{
		pArr[i] = temp[i];
	}
}
//정리되어진 두배열의 시작인데스들을 가져온다
void Sort::Merge_Divided(int* pArr, int left, int right)
{
	if (left < right)
	{
		int mid = (left + right) / 2;
		
		Merge_Divided(pArr, left, mid);
		Merge_Divided(pArr, mid + 1, right);
		Merge(pArr, left, mid, right);
	}
}
