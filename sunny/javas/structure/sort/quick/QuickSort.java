package sort;


public class QuickSort {

    public void sort(int[] data, int l, int r){
        int left = l;
        int right = r;
        int pivot = data[(l+r)/2];

        do {
            // pivot 보다 큰 원소 찾을 때까지 이동
            while(data[left] < pivot){
                left++;
            }
            // pivot 보다 작은 원소 찾을 때까지 이동
            while(data[right] > pivot) {
                right--;
            }
            if(left <= right) {
                int temp = data[left];
                data[left] = data[right];
                data[right] = temp;
                left++;
                right--;
            }
        }while (left <= right);

            if(l < right) {
                sort(data, l, right);
            }
            if(r > left) {
                sort(data, left, r);
            }
        }

        public static void main(String[] args){

            int data[] = {69, 10, 30, 2, 16, 8, 31, 22};

            QuickSort quickSort = new QuickSort();

            quickSort.sort(data, 0, data.length-1);

            for(int i=0; i<data.length; ++i){
                System.out.println("data["+i+"] : "+data[i]);
            }

        }
}
