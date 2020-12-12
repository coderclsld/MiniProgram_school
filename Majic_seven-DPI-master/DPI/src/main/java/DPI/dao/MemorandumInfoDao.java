package DPI.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;

import DPI.entity.MemorandumInfo;

@Mapper
@Component
public interface MemorandumInfoDao {

	void insertMemorandumInfo(MemorandumInfo memorandumInfo);
	List<MemorandumInfo> loadAllMemorandumInfo(String openid);
	MemorandumInfo loadMemorandumInfoById(int id);
	void udateMemorandumInfoById(MemorandumInfo memorandumInfo);
}
