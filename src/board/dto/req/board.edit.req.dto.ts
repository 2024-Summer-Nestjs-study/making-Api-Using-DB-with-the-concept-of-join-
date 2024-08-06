export class BoardEditReqDto {
  /**변경할 게시글 번호**/
  index: number;
  /**변경할 내용**/
  title: string;
  content: string;
}
