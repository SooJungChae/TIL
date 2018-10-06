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

void Sort::Insert()
{
}
